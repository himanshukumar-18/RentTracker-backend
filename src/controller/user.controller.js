import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import AsyncHandler from "../utils/AsyncHandler.js"
import uploadFile from "../utils/fileUpload.js"
import { User } from "../model/user.model.js"

const rentDetailsRegister = AsyncHandler(async (req, res) => {

    const { date, rentAmount, paymentMethod, } = req.body
    console.log("BODY:", req.body)
    console.log("FILE:", req.files)

    // validation required filed
    if (!date?.trim() || !rentAmount?.trim() || !paymentMethod) {
        throw new ApiError(400, "All fields are required.");
    }

    // validation rent amount
    if (isNaN(rentAmount) || Number(rentAmount) <= 0) {
        throw new ApiError(400, "Rent amount must be a positive number.");
    }

    // validation upload
    const proofLocalPath = req.files?.uploadProof?.[0]?.path;
    if (!proofLocalPath) {
        throw new ApiError(400, "Proof is required!!");
    }

    const uploadProof = await uploadFile(proofLocalPath);
    if (!uploadProof?.secure_url) {
        throw new ApiError(500, "File upload failed.");
    }


    // save rent details
    const rentDetails = await User.create({
        date,
        rentAmount: Number(rentAmount),
        paymentMethod,
        proof: uploadProof.secure_url
    })

    if (!rentDetails) {
        throw new ApiError(500, "Failed to register rent details.");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, rentDetails, "Details registered successfully."));
})

const findHistory = AsyncHandler(async (req, res) => {
    const { date } = req.query || {};
    console.log("DATE:", date);

    if (!date) {
        throw new ApiError(404, "Please select correct date.");
    }

    const history = await User.findOne({ date });

    if (!history) {
        throw new ApiError(404, "No history found for the given date.");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, history, "History fetched successfully."));
});



export {
    rentDetailsRegister,
    findHistory
}