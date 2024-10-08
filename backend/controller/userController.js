import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/authMiddleware.js";

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

    const user = await User({
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

    await user.save();


    const payload = {
      id: user._id,
      email: user.email,
      role: user.role
    }

    const token = generateToken(payload);

    res.status(201).json({ message: 'User created successfully', token });
    
  } catch (error) {
    console.error("Error during patient registration:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//login part

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Please provide both email and password." });
  }
  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ success: false, message: "User not found." });
    }
    const isValidPassword = await bcrypt.compare(password, userExist.password);

    if(!isValidPassword){
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = {
      id: userExist._id,
      email: userExist.email,
      role: userExist.role
    }

    const token = generateToken(payload);

    res.cookie('token', token, {
      httpOnly: false,
      secure: true,
      sameSite: 'Strict',
      maxAge: 3600000,
    })

    return res.status(200).json({
      message: "User logged In Sucessfully",
      userExist: {
        id: userExist._id,
        role: userExist.role
      }
    })

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const fetchUserById = async (req, res) => {
    const userId = req.params.id;

    try {
      const fetchedUser = await User.findById(userId);
      if(!fetchedUser){
        return res.status(404).json({message: "User not found"})
      }

      return res.status(200).json({message: "User found", user: fetchedUser});
    } catch (error) {
      console.error("Something went wrong in fetching user")
      res.status(500).json({message: "Internal Server error", error})
    }
}


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

  // Validate if all required fields are provided
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

  try {
    // Check if the email is already registered
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return res.status(400).json({ success: false, message: "Doctor With This Email Already Exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new doctor document in the database
    const newDoctor = await User.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      password: hashedPassword,
      role: "Doctor",
      doctorDepartment,
    });

    // Generate JWT token for authentication
    const token = await newDoctor.generateToken();

    // Send success response with the newly created doctor document and token
    res.status(200).json({
      success: true,
      message: "New Doctor Registered",
      doctor: newDoctor,
      token,
      userId: newDoctor._id.toString(),
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


    if (isPasswordValid) {
     
      res.status(200).json({
        message: "Login Successful",
        token: await doctor.generateToken(), 
        userId: doctor._id.toString(),
      });
    } else{
      return res.status(400).json({ success: false, message: "Invalid email or password." });
    }

    
  } catch (error) {
    console.error("Error during doctor login:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};



export const getUserDetails = async (req, res) => {
  const user = req.body;
  const userId = user._id; 
  res.status(200).json({
    success: true,
    user: {
      _id: userId,
    },
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
  res.clearCookie("patientToken").status(201).json({
    success: true,
    message: "Patient Logged Out Successfully.",
  });
};


export const pollBackend = async (req, res) => {
  try {
    res.status(200).json({ message: "Backend is active" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


