import User from "../models/UserModel.js";
import argon2 from "argon2";
export const getUser = async (req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['id', 'name', 'lastname', 'email', 'password']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const getUserByid = async (req, res) => {
    try {
        const response = await User.findOne({
            attributes: ['id', 'name', 'lastname', 'email', 'password'],
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const createUser = async (req, res) => {
    const {name, lastname, email, password, confPassword, role} = req.body;
    if (password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            name: name,
            lastname: lastname,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg: "Register Berhasil"})
    } catch (error) {
        res.status(500).json({msg: error.message + "none"});
    }
};
export const updateUser = async (req, res) => {

    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const {name, lastname, email, password, confPassword, role} = req.body;
    let hashPassword;
    if (password === "" || password === null) {
        hashPassword = user.password
    } else {
        hashPassword = await argon2.hash(password);
    }
    if (password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    try {
        await User.update({
            name: name,
            lastname: lastname,
            email: email,
            password: hashPassword,
            role: role
        }, {
            where: {
                id: user.id
            }
        });
        res.status(201).json({msg: "User Update"})
    } catch (error) {
        res.status(500).json({msg: error.message + "none"});
    }
};
export const deleteUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    if (!user) return res.status(404).json({msg: "User tidak ditemukan"});
    try {
        await User.destroy({
            where: {
                id: user.id
            }
        });
        res.status(200).json({msg: "user Destroy"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
};