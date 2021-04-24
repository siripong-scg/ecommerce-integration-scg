/**
 * Repository Pattern for testing
 */

export default ($axios) => (resource) => ({
  guestLogin() {
    const endpoint = '/api-gateway-service/auth/guestlogin?lang=en&userType=buyer&orgIdfier=scg&b-uid=1.0.459';
    console.log('GET', endpoint);

    return $axios.$get(endpoint);
  },

  signup(registerData) {
    const payload = {
      lang: registerData.lang,
      userType: registerData.userType,
      orgIdfier: registerData.orgIdfier,
      fullName: registerData.fullName,
      phoneNo: registerData.phoneNo,
      useremail: registerData.useremail,
      password: registerData.password,
      preferredLanguage: registerData.preferredLanguage,
      staySignedIn: registerData.staySignedIn,
      phoneCountryCode: registerData.phoneCountryCode,
      customFields: registerData.customFields, // { 'cookieEnabled':true, 'subscribeNewsletters':false, 'sharePersonalInfo':false }
      occupation: registerData.occupation
    };

    const endpoint = '/buyer-service/auth/signup';
    console.log('POST', endpoint, payload);

    return $axios.$post(endpoint, payload);
  },

  // Unavailable on Postman [FAILURE AUTH]
  facebookLogin() {
    const endpoint = '/api-gateway-service/oauth2/authorization/facebook';
    console.log('GET', endpoint);

    return $axios.$get(endpoint);
  },

  // Unavailable on Postman [FAILURE 400]
  socialLogin() {
    const endpoint = '/api-gateway-service/socialauth';
    console.log('GET', endpoint);

    return $axios.$get(endpoint);
  },

  logout() {
    const endpoint = '/api-gateway-service/auth/logout';
    console.log('POST', endpoint);

    return $axios.$post(endpoint);
  },

  changePassword(user, token, newPassword, currentPassword) {
    const payload = {
      lang: user.preferredLanguage || 'th',
      userType: user.userType || 'BUYER',
      orgIdfier: user.orgIdfier || 'scg',
      newPassword,
      token,
      currentPassword,
      userId: user.userId
    };

    const endpoint = '/authentication-service/user/change-password';
    console.log('POST', endpoint, payload);

    return $axios.$post(endpoint, payload);
  },

  requestOTP(requestOTPData) {
    const payload = {
      locale: requestOTPData.locale,
      phone: requestOTPData.phone,
      email: requestOTPData.email,
      userParams: requestOTPData.userParams
    };

    const endpoint = '/authentication-service/user/OTP';
    console.log('POST', endpoint, payload);

    return $axios.$post(endpoint, payload);
  },

  verifyOTP(otpId, otp) {
    const payload = {
      otpId,
      otp
    };

    const endpoint = '/authentication-service/user/OTP/verify';
    console.log('POST', endpoint, payload);

    return $axios.$post(endpoint, payload);
  },

  forgetPassword(resetPassData) {
    const payload = {
      lang: resetPassData.lang,
      userType: resetPassData.userType,
      orgIdfier: resetPassData.orgIdfier,
      useremail: resetPassData.useremail,
      phoneNo: resetPassData.phoneNo
    };

    const endpoint = '/buyer-service/auth/send-reset-link';
    console.log('POST', endpoint, payload);

    return $axios.$post(endpoint, payload);
  },

  profile(user) {
    const endpoint = `/buyer-service/profile/${user.userId}`;
    console.log('GET', endpoint);

    return $axios.$get(endpoint);
  },

  updateProfile(user, fullName, phoneNo, email, occupation, communicationChannels) {
    const payload = {
      lang: 'th',
      userId: user.userId,
      fullName,
      useremail: email,
      phoneNo,
      phoneCountryCode: user.phoneCountryCode,
      businessType: user.businessType || 'PERSONAL',
      occupation,
      companyProfile: user.companyProfile || null,
      communicationChannels
    };
    const endpoint = '/buyer-service/profile';
    console.log('PUT', endpoint, payload);

    return $axios.put(endpoint, payload);
  },

  updateCompanyProfile(user, companyProfile) {
    const payload = {
      userId: user.userId,
      fullName: user.fullName,
      useremail: user.useremail,
      phoneNo: user.phoneNo,
      phoneCountryCode: user.phoneCountryCode,
      businessType: user.businessType,
      occupation: user.occupation,

      companyTaxNo: companyProfile.taxNo,
      companyBranchCode: companyProfile.branchCode,
      companyName: companyProfile.name,
      companyPhone: companyProfile.phone,
      companyAddress: companyProfile.address,
      companyEmail: companyProfile.email
    };

    const endpoint = '/buyer-service/profile';
    console.log('PUT', endpoint, payload);

    return $axios.put(endpoint, payload);
  },

  deleteUserRequest(user) {
    const payload = {
      lang: user.preferredLanguage || 'th',
      userType: user.userType || 'BUYER',
      orgIdfier: user.orgIdfier || 'scg',
      userId: user.userId,
      status: 'OPEN',
      reason: 'no reason'
    };

    const endpoint = '/buyer-service/auth/user-delete-request';
    console.log('POST', endpoint, payload);

    return $axios.$post(endpoint, payload);
  },

  coupon(user, limit, page, selectionStatus) {
    const payload = {
      lang: user.preferredLanguage || 'th',
      userType: user.userType || 'BUYER',
      orgIdfier: user.orgIdfier || 'scg',
      userId: user.userId,
      limit,
      page,
      selectionStatus
    };

    const endpoint = '/promotion-service/promotions/coupon/users/mycpns';
    console.log('POST', endpoint, payload);

    return $axios.$post(endpoint, payload);
  },

  wishlistedProducts(user) {
    const endpoint = '/buyer-service/wishlisted-products';
    const payload = {
      lang: user.preferredLanguage || 'th',
      orgIdfier: user.orgIdfier || 'scg',
      userId: user.userId
    };

    console.log('POST', endpoint, payload);

    return $axios.$post(endpoint, payload);
  },

  deleteWishlist(user, skuNumber) {
    const endpoint = `/buyer-service/wishlists?lang=${user.preferredLanguage}&userType=${user.userTypes[0]}&orgIdfier=${user.orgIdfier}&userId=${user.userId}&skuNumber=${skuNumber}`;

    console.log('DELETE', endpoint);

    return $axios.$delete(endpoint);
  },

  wishlist(user) {
    const endpoint = `/buyer-service/wishlist/user?orgIdfier=${user.orgIdfier}&userId=${user.userId}`;
    console.log('GET', endpoint);

    return $axios.$get(endpoint);
  },

  addWishList(user, price, sellerId, skuNumber) {
    const payload = {
      orgIdfier: user.orgIdfier,
      price,
      sellerId,
      skuNumber
    };

    const endpoint = '/buyer-service/wishlists';
    console.log('POST', endpoint, payload);
    return $axios.$post(endpoint, payload);
  },

  socialRequestOTP(requestOTPData) {
    const payload = {
      lang: requestOTPData.lang,
      userType: requestOTPData.userType,
      orgIdfier: requestOTPData.orgIdfier,
      locale: requestOTPData.locale,
      phone: requestOTPData.phone,
      email: requestOTPData.email,
      type: requestOTPData.type,
      otpTemplate: requestOTPData.otpTemplate,
      socialId: requestOTPData.socialId,
      authProvider: requestOTPData.authProvider,
      userId: requestOTPData.userId,
      userParams: requestOTPData.userParams
    };
    const endpoint = '/authentication-service/user/OTP';
    console.log('POST', endpoint, payload);

    return $axios.$post(endpoint, payload);
  },

  getSavedCreditCard(user) {
    const endpoint = `/order-service/savedcards/${user.userId}?lang=${user.preferredLanguage}&userType=${user.userTypes[0]}&orgIdfier=scg`;
    console.log('GET', endpoint);

    return $axios.$get(endpoint);
  },

  deleteSavedCard(user, userCardId, limit, page, tabType, itemType) {
    const payload = {
      lang: user.preferredLanguage,
      userType: user.userTypes[0],
      orgIdfier: user.orgIdfier,
      userId: user.userId,
      limit,
      page,
      tabType,
      itemType
    };

    const endpoint = `/order-service/savedcards/${user.userId}?userCardId=${userCardId}&lang=${user.preferredLanguage}&userType=${user.userTypes[0]}&orgIdfier=scg`;
    console.log('DELETE', endpoint, payload);

    return $axios.$delete(endpoint, payload);
  },

  socialVerifyOTP(verifyOTPData) {
    const payload = {
      lang: verifyOTPData.lang,
      userType: verifyOTPData.userType,
      orgIdfier: verifyOTPData.orgIdfier,
      locale: verifyOTPData.locale,
      otpId: verifyOTPData.otpId,
      otp: verifyOTPData.otp,
      phone: verifyOTPData.phone,
      buyerName: verifyOTPData.buyerName,
      type: verifyOTPData.type
    };

    const endpoint = '/order-service/otp/verify/send-sms';
    console.log('POST', endpoint, payload);
    return $axios.$post(endpoint, payload);
  },

  login(payload) {
    const endpoint = '/api-gateway-service/auth/login';
    console.log('POST', endpoint, payload);

    return $axios.$post(endpoint, payload);
  },

  sellerLogin(payload) {
    const endpoint = 'buyer-service/auth/signup/user/type';
    console.log('POST', endpoint, payload);

    return $axios.$post(endpoint, payload);
  },

  getUserInfo(accessToken) {
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    };
    const endpoint = '/authentication-service/user/userinfo?lang=en&userType=BUYER&orgIdfier=scg&auth=true';
    console.log('GET', endpoint);

    return $axios.$get(endpoint, axiosConfig);
  },

  resendOTP(resendOTPData) {
    const payload = {
      lang: resendOTPData.lang,
      userType: resendOTPData.userType,
      orgIdfier: resendOTPData.orgIdfier,
      locale: resendOTPData.locale,
      phone: resendOTPData.phone,
      type: resendOTPData.type,
      otpTemplate: resendOTPData.otpTemplate,
      socialId: resendOTPData.socialId,
      authProvider: resendOTPData.authProvider,
      userId: resendOTPData.userId,
      otpId: resendOTPData.otpId,
      userParams: resendOTPData.userParams
    };

    const endpoint = '/authentication-service/user/OTP/resend';
    console.log('POST', endpoint, payload);

    return $axios.$post(endpoint, payload);
  },

  socialSignup(registerData, signupToken, action) {
    const payload = {
      lang: registerData.lang,
      userType: registerData.userType,
      orgIdfier: registerData.orgIdfier,
      fullName: registerData.fullName,
      phoneNo: registerData.phoneNo,
      useremail: registerData.useremail,
      password: registerData.password,
      preferredLanguage: registerData.preferredLanguage,
      staySignedIn: registerData.staySignedIn,
      phoneCountryCode: registerData.phoneCountryCode,
      socialId: registerData.socialId,
      authProvider: registerData.authProvider,
      userId: registerData.userId,
      customFields: registerData.customFields
    };
    const axiosConfig = {
      headers: {
        signuptoken: signupToken,
        action
      }
    };
    const endpoint = '/buyer-service/auth/signup/social';
    console.log('POST', endpoint, payload);

    return $axios.$post(endpoint, payload, axiosConfig);
  },

  deleteUserAgeing(user) {
    const payload = {
      lang: user.preferredLanguage,
      userType: user.userTypes[0],
      orgIdfier: user.orgIdfier,
      userId: user.userId,
      status: 'OPEN',
      reason: 'no reason'
    };

    const endpoint = '/buyer-service/auth/user-delete-request/bulk-delete-aging';
    console.log('PUT', endpoint, payload);

    return $axios.$put(endpoint, payload);
  },
  validateResetPass(accessToken) {
    const endpoint = `/authentication-service/user/reset-password/token/validate/${accessToken}?lang=th&userType=BUYER&orgIdfier=scg&b-uid=1.0.474`;
    console.log('GET', endpoint);

    return $axios.$get(endpoint);
  },
  resetPassword(resetPassData) {
    const payload = {
      lang: resetPassData.lang,
      newPassword: resetPassData.newPassword,
      orgIdfier: resetPassData.orgIdfier,
      token: resetPassData.token,
      userType: resetPassData.userType
    };

    const endpoint = '/buyer-service/auth/reset-password?b-uid=1.0.475';
    console.log('POST', endpoint, payload);

    return $axios.$post(endpoint, payload);
  },
  getProfile(user) {
    const endpoint = `/seller/buyer-service/profile/${user.userId}`;
    console.log('GET', endpoint);

    return $axios.$get(endpoint);
  },

  getUserDetail(value) {
    const endpoint = `/authentication-service/user/email-or-phone?value=${value}`;
    console.log('GET', endpoint);

    return $axios.$get(endpoint);
  },

  adminSignup(registerData) {
    const endpoint = '/buyer-service/auth/signup/user-service';
    const payload = {
      lang: 'th',
      userType: 'BUYER',
      orgIdfier: 'scg',
      fullName: registerData.fullName,
      phoneNo: registerData.phoneNo,
      useremail: registerData.useremail,
      password: registerData.password,
      occupation: registerData.occupation,
      preferredLanguage: 'th',
      staySignedIn: false,
      phoneCountryCode: registerData.phoneCode,
      customFields: {
        cookieEnabled: true,
        subscribeNewsletters: true,
        sharePersonalInfo: true
      },
      source: null
    };
    console.log('POST', endpoint, payload);

    return $axios.$post(endpoint, payload);
  },

  portalSetting(localeCode, orgIdfier) {
    const endpoint = `/buyer-service/portal-settings?localeCode=${localeCode}&orgIdfier=${orgIdfier}`;
    console.log('GET', endpoint);

    return $axios.$get(endpoint);
  }
});
