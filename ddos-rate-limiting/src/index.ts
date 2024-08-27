import express from "express";
import crypto from "crypto";
import cors from "cors";
const app = express();
const port = parseInt(process.env.PORT || "3000");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow your specific frontend domain
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  })
);

app.get("/", (req, res) => {
  const name = process.env.NAME || "World";
  res.send(`Hello ${name}!`);
});

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});

function generateOTP(length: number) {
  // Ensure the length is a positive number
  if (!Number.isInteger(length) || length <= 0) {
    throw new Error("OTP length must be a positive integer");
  }

  // Generate a random number using randomBytes
  const otp = crypto
    .randomBytes(length)
    .toString("hex") // Convert the random bytes to a hexadecimal string
    .slice(0, length); // Slice to the desired length

  return otp;
}

// Example usage: Generate a 6-digit OTP
const otp = generateOTP(6);
console.log(`Your OTP is: ${otp}`);
