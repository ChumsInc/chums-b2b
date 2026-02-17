export const PATH_CUSTOMER_ACCOUNT = '/account/:customerSlug';
export const PATH_CUSTOMER_DELIVERY = '/account/:customerSlug/delivery/:code';
export const PATH_LOGIN = '/login';
export const PATH_PAGE = '/pages/:keyword';
export const PATH_PRODUCT = '/products/:category/:product?';
export const PATH_PRODUCT_WITHOUT_PARENT = '/products/:product';
export const PATH_PROFILE = '/profile';
export const PATH_PROFILE_ACCOUNT = '/profile/:id';
export const PATH_SIGNUP = '/signup';
export const PATH_SET_PASSWORD = '/set-password';
export const PATH_CATEGORY = '/products/:category';


export const CONTENT_PATH_SEARCH_IMAGE = '/images/products/80/:image';

export interface DocumentTitleList {
    [key: string]: string;
}
export const documentTitles:DocumentTitleList = {
    accountList: 'Account List: :name',
    home: 'Home',
    login: 'Log In',
    profile: 'Profile Page',
    profileChangePassword: 'Change Password',
    signUp: 'Sign Up',
};
