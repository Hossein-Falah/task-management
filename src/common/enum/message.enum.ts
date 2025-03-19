export enum RegisterMessage {
    INVALID_PHONE_NUMBER = "لطفا شماره تلفن خود را به صورت صحیح وارد کنید",
    USERNAME_REQUIRED = "نام کاربری الزامی است",
    PASSWORD_REQUIRED = "رمز عبور الزامی است",
    PHONE_NUMBER_MIN_LENGTH = "شماره تلفن باید حداقل 11 رقم باشد",
    PASSWORD_MIN_LENGTH = "رمز عبور باید حداقل 8 رقم باشد",
    PASSWORD_INVALID = "رمز عبور باید شامل حروف کوچک و بزرگ باشد",
    USER_CREATED = "کاربر با موفقیت ثبت نام شد",
    USERNAME_MIN_LENGTH = "نام کاربری باید حداقل 5 کاراکتر باشد"
}

export enum AuthMessage {
    USER_EXIST = "کاربری با این اطلاعات قبلا ثبت نام کرده است"
}

export enum BadRequestMessage {
    InValid = "اطلاعات وارد شده معتبر نمی باشد"
}