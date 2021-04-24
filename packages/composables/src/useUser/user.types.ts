export type ICustomer = {
  customer: {
    name: string
    id: string
  }
};

export type CustomerSignMeInDraft = {
  email: string
  password: string
}

export type CustomerSignMeUpDraft = {
  name: string
}

export type ICustomerLogin = {
  email: string
  password: string
}
