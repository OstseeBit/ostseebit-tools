export type ToDateMapper = (value: string) => Date;

export interface DateFormat {
  id: string
  name: string
  fromDate: (date: Date) => string
  toDate: (value: string) => Date
  formatMatcher: (dateString: string) => boolean
}
