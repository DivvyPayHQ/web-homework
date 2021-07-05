import { STATUS_TYPES } from 'Components/statusIcon/StatusIcon'

export function resolveTransactionStatus (status) {
  switch (status) {
    case 'COMPLETE':
      return STATUS_TYPES.GOOD
    case 'PENDING':
      return STATUS_TYPES.WARNING
    default:
      return STATUS_TYPES.BAD
  }
}
