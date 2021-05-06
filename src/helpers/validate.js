export function hardPassword(value) {
    return /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(
        value
    );
}
export function minLengthOfArray(array) {
    return !!array.length
}
