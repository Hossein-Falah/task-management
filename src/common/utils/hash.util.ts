import * as bcrypt from "bcrypt";

export const hashPassword = (password:string) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

export const comparePassword = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
}