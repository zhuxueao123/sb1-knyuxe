export const ORDER_STATUS = {
  AUDITING: 10,    // 审核中
  AUDITED: 20,     // 已审核
  DELIVERING: 30,  // 配送中
  COMPLETION: 40,  // 完成
  VOIDED: 50,      // 作废
  RETURN: 60,      // 退货中
  RETURN_OK: 70    // 退货成功
} as const;

export const PAYMENT_STATUS = {
  PENDING: 10,     // 未付款
  AUTHORIZED: 20,  // 授权提货
  HALF: 25,        // 未付全款
  CREDIT: 28,      // 信用额度付款
  PAID: 30,        // 已付款
  REFUNDED: 40,    // 退款
  VOIDED: 50       // 作废
} as const;

export const getPaymentStatusType = (status: number) => {
  switch (status) {
    case PAYMENT_STATUS.PENDING: return 'warning';     // 未付款
    case PAYMENT_STATUS.AUTHORIZED: return 'success';  // 授权提货
    case PAYMENT_STATUS.HALF: return 'warning';        // 未付全款
    case PAYMENT_STATUS.CREDIT: return 'info';         // 信用额度付款
    case PAYMENT_STATUS.PAID: return 'success';        // 已付款
    case PAYMENT_STATUS.REFUNDED: return 'danger';     // 退款
    case PAYMENT_STATUS.VOIDED: return 'info';         // 作废
    default: return 'info';
  }
};

export const getPaymentStatusText = (status: number) => {
  switch (status) {
    case PAYMENT_STATUS.PENDING: return '未付款';
    case PAYMENT_STATUS.AUTHORIZED: return '授权提货';
    case PAYMENT_STATUS.HALF: return '未付全款';
    case PAYMENT_STATUS.CREDIT: return '信用额度付款';
    case PAYMENT_STATUS.PAID: return '已付款';
    case PAYMENT_STATUS.REFUNDED: return '退款';
    case PAYMENT_STATUS.VOIDED: return '作废';
    default: return '未知状态';
  }
};