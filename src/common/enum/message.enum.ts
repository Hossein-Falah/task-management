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
    LOGIN_REQUIRED = "لطفا وارد حساب کاربری خود شوید",
    INVALID_EMAIL = "ایمیل معتبر نمی باشد"
}

export enum BadRequestMessage {
    InValid = "اطلاعات وارد شده معتبر نمی باشد"
}

export enum UserMessage {
    USER_ROLE_ALREADY_CHANGED = "نقش کاربر قبلا تغییر کرده است لطفا به نقش دیگری تغییر دهید",
    USER_ROLE_CHANGED = "نقش کاربر با موفقیت تغییر کرد",
    USER_INFORMATION_CHANGED = "اطلاعات کاربر با موفقیت تغییر کرد",
    USER_PHONE_ALREADY_EXIST = "شماره تلفن قبلا ثبت شده است",
    USER_EMAIL_ALREADY_EXIST = "ایمیل قبلا ثبت شده است",
    USER_DELETED = "کاربر با موفقیت حذف شد",
    USER_UPDATED = "کاربر با موفقیت به روز شد",
    USER_PROFILE_UPLOADED = "تصویر پروفایل کاربر با موفقیت آپلود شد"
}

export enum TokenMessage {
    TOKEN_CREATED_FAILED = "خطای در ایجاد توکن رخ داده است لطفا مجددا تلاش کنید",
    TOKEN_INVALID = "توکن معتبر نمی باشد",
    TOKEN_EXPIRED = "توکن منقضی شده است لطفا مجددا وارد حساب کاربری خود شوید"
}

export enum ForbiddenMessage {
    ACCESS_DENIED = "شما مجوز دسترسی به این بخش را ندارید"
}

export enum UploadMessage {
    INVALID_IMAGE_FORMAT = "فقط فرمت png, jpg, jpeg مورد قبول است",
    FILE_SIZE_EXCEEDED = "حجم فایل باید کمتر از 5MB باشد",
    IMAGE_REQUIRED = "تصویر الزامی است"
}

export enum TaskMessage {
    TASK_NOT_FOUND = "تسکی با این اطلاعات یافت نشد",
    TASK_ALREADY_EXIST = "تسکی با این عنوان قبلا ثبت شده است",
    TASK_CREATED = "تسک با موفقیت ثبت شد",
    TITLE_REQUIRED = "عنوان الزامی است",
    TITLE_MIN_LENGTH = "عنوان باید حداقل 5 کاراکتر باشد",
    DESCRIPTION_MIN_LENGTH = "توضیحات باید حداقل 5 کاراکتر باشد",
    TASK_DELETED = "تسک با موفقیت حذف شد",
    TASK_UPDATED = "تسک با موفقیت به روز شد"
}