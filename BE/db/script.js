import bcrypt from 'bcryptjs';

const getPass = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
}

getPass('adminpass');