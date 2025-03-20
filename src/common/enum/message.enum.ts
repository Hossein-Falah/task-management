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
    USER_EXIST = "کاربری با این اطلاعات قبلا ثبت نام کرده است",
    USER_NOT_FOUND = "کاربری با این اطلاعات یافت نشد",
    USERNAME_OR_PASSWORD_INVALID = "رمز عبور یا نام کاربری اشتباه است",
    LOGIN_SUCCESS = "ورود با موفقیت انجام شد",
    LOGIN_REQUIRED = "لطفا وارد حساب کاربری خود شوید"
}

export enum BadRequestMessage {
    InValid = "اطلاعات وارد شده معتبر نمی باشد"
}

export enum UserMessage {
    USER_ROLE_ALREADY_CHANGED = "نقش کاربر قبلا تغییر کرده است لطفا به نقش دیگری تغییر دهید",
    USER_ROLE_CHANGED="نقش کاربر با موفقیت تغییر کرد"
}

export enum TokenMessage {
    TOKEN_CREATED_FAILED = "خطای در ایجاد توکن رخ داده است لطفا مجددا تلاش کنید",
    TOKEN_INVALID = "توکن معتبر نمی باشد"
}

export enum ForbiddenMessage {
    ACCESS_DENIED = "شما مجوز دسترسی به این بخش را ندارید"
}