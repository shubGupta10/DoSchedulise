import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";

export const patientRegister = async (req, res) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } = req.body;
  if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password) {
    return res.status(400).json({ success: false, message: "Please Fill Full Form!" });
  }

  try {
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return res.status(400).json({ success: false, message: "User already Registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password: hashedPassword,
      role: "Patient",
    });

    res.status(200).json({
      success: true,
      message: "User Registered",
      user,
    });
  } catch (error) {
    console.error("Error during patient registration:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Please provide both email and password." });
  }
  try {
    const user = await User.findOne({ email,  role: "Patient" });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found." });
    }

  

    res.status(200).json({ success: true, message: "Login successful!", user });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const addNewAdmin = async (req, res) => {
  const { firstName, lastName, email, phone, nic, dob, gender, password } = req.body;
  if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !password) {
    return res.status(400).json({ success: false, message: "Please Fill Full Form!" });
  }

  try {
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return res.status(400).json({ success: false, message: "Admin With This Email Already Exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password: hashedPassword,
      role: "Admin",
    });

    res.status(200).json({
      success: true,
      message: "New Admin Registered",
      admin,
    });
  } catch (error) {
    console.error("Error during admin registration:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const addNewDoctor = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment
  ) {
    return res.status(400).json({ success: false, message: "Please Fill Full Form!" });
  }

  const isRegistered = await User.findOne({ email });

  if (isRegistered) {
    return res.status(400).json({ success: false, message: "Doctor With This Email Already Exists!" });
  }

  try {
    const doctor = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password, 
      role: "Doctor",
      doctorDepartment,
    });

    res.status(200).json({
      success: true,
      message: "New Doctor Registered",
      doctor,
    });
  } catch (error) {
    console.error("Error while adding new doctor:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getAllDoctors = async (req, res) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
};


export const doctorLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Please provide both email and password." });
  }
  try {
    const doctor = await User.findOne({ email, role: "Doctor" });
    if (!doctor) {
      return res.status(400).json({ success: false, message: "Invalid email or password." });
    }
    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid email or password." });
    }
    res.status(200).json({ success: true, message: "Login successful!", doctor });
  } catch (error) {
    console.error("Error during doctor login:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



export const getUserDetails = async (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
};

export const logoutAdmin = async (req, res) => {
  res
    .status(201)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin Logged Out Successfully.",
    });
};

export const logoutPatient = async (req, res) => {
  res
    .status(201)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient Logged Out Successfully.",
    });
};
