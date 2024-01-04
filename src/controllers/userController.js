const UserModel = require("../models/userModel");
const multer = require('multer')
const { cloudinary } = require('./../utils/cloudinary')

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/user')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `user-${req?.user?.id}-${Date.now()}.${ext}`);
    }
})

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new Error('Not an image! please upload only image', false));
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})

exports.uploadProfileImage = upload.single('profile_image');

exports.updateUser = async (req, res) => {
    try {
        const { name } = req.body;
        let profile_image = '';
        if (req.file) {
            profile_image = await cloudinary.uploader.upload(req.file.path);
        }

        const { userId } = req.params

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res
                .status(403)
                .json({ message: 'Unauthorized to update user profile.' });
        }

        if (req.fileValidationError) {
            return res.status(400).json({ message: req.fileValidationError.message });
        }

        if (name) {
            user.name = name;
        }
        if (profile_image) {
            user.profile_image = profile_image.secure_url;
        }

        await user.save()

        return res
            .status(200)
            .json({ message: 'User profile updated successfully.' });

    } catch (error) {
        return res
            .status(500)
            .json({ message: 'An error occurred while updating user profile.' });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (userId !== req.user.id && req.user.role !== 'admin') {
            return res
                .status(403)
                .json({ message: 'Unauthorized to delete user account.' });
        }

        await UserModel.findByIdAndDelete(userId);

        return res
            .status(200)
            .json({ message: 'User account deleted successfully.' });

    } catch (error) {
        return res
            .status(500)
            .json({ message: 'An error occurred while deleting user account.' });
    }
}

exports.createAdmin = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        let profile_image = '';
        if (req.file) {
            profile_image = await cloudinary.uploader.upload(req.file.path);
        }

        if (!email && !phone) {
            return res.status(400).json({ message: 'Please provide at least one of email or phone number.' });
        }
        const existingUser = await UserModel.findOne({
            $or: [{ email, role: 'admin' }, { phone, role: 'admin' }],
        });

        if (existingUser) {
            return res
                .status(400)
                .json({ message: 'Email or Phone Number already exists' });
        }

        const newAdmin = await UserModel.create({ email, phone, password, profile_image: profile_image.secure_url, name, role: 'admin' });

        return res.status(201).json({
            message: 'Admin account created successfully.',
            data: {
                adminUser: newAdmin,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the admin account.' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({ role: 'user' }, '-password');

        res.status(200).json({
            massage: 'Get users successfully',
            data: {
                users,
            }
        })

    } catch (error) {
        res.status(500).json({ message: 'An error occurred while get all user' })
    }
}

exports.getMe = (req, res) => {
    try {
        const user = req.user;

        res.status(200).json({
            massage: 'Get current user successfully',
            data: {
                user,
            }
        })

    } catch (error) {
        res.status(500).json({ message: 'An error occurred while get current user' })
    }
}