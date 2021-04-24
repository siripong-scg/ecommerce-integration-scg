export const state = () => ({
  tabActive: null,
  rfq: {
    active: 0,
    arr: [
      {
        label: 'My Request',
        status: 'Pending',
        senderType: 'buyer',
        requestDate: '2020-07-01T12:30:35.384+0000',
      },
      {
        label: 'My Request',
        status: 'Seller Reject',
        senderType: 'seller',
        requestDate: '2020-07-02T09:05:35.384+0000',
      },
      {
        label: 'Quotation',
        status: 'Seller Response',
        senderType: 'seller',
        requestDate: '2020-07-03T14:10:35.384+0000',
      },
      {
        label: 'Quotation',
        status: 'Purchased',
        senderType: 'buyer',
        requestDate: '2020-07-04T22:50:35.384+0000',
      },
      {
        label: 'Quotation',
        status: 'Buyer Reject',
        senderType: 'buyer',
        requestDate: '2020-07-05T18:44:35.384+0000',
      },
      {
        label: 'Quotation',
        status: 'Quote Expired',
        senderType: 'buyer',
        requestDate: '2020-07-06T17:20:35.384+0000',
      },
      {
        label: 'Message',
        status: 'Buyer Message',
        senderType: 'buyer',
        requestDate: '2020-07-04T22:50:35.384+0000',
      },
      {
        label: 'Message',
        status: 'Seller Message',
        senderType: 'seller',
        requestDate: '2020-07-04T22:50:35.384+0000',
      },
    ],
  },
  isOpeningMenu: false,
  beforeLogin: null,
  ipAddress: null,
  deviceDetectData: null,
  firstTimeStampAsDate: null,
  firstTimeStamp: new Date().getTime(),
  timeStamp: new Date().getTime(),
  prevPage: '',
  addFriend: false,
  userProfile: null,
});

export const mutations = {
  SET_RFQ_ACTIVE(state, active) {
    state.rfq.active = active;
  },
  SET_TAB_ACTIVE(state, i) {
    state.tabActive = i;
  },
  SET_OPENING_MENU(state, i) {
    state.isOpeningMenu = i;
  },
  SET_BEFORE_LOGIN(state, value) {
    state.beforeLogin = value;
  },
  SET_IP_ADDRESS(state, value) {
    state.ipAddress = value;
  },
  SET_DEVICE_DETECT(state, value) {
    state.deviceDetectData = value;
  },
  SET_FIRST_DATE(state, value) {
    if (state.firstTimeStampAsDate == null) {
      state.firstTimeStampAsDate = value;
    }
  },
  SET_FIRST_TIMESTAMP(state, value) {
    if (state.firstTimeStamp == null) {
      state.firstTimeStamp = value;
      state.timeStamp = value;
    }
  },
  SET_TIMESTAMP(state, value) {
    const THIRTY_MIN = 30 * 60 * 1000;
    if (state.timeStamp - value > THIRTY_MIN) {
      state.timeStamp = value;
    }
  },
  SET_PREV_PAGE(state, value) {
    state.prevPage = value;
  },
  SET_ADD_FRIEND(state, value) {
    state.addFriend = value;
  },
  SET_USER_PROFILE(state, userProfile) {
    state.userProfile = userProfile;
  },
};
