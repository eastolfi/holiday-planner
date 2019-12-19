import * as moment from "moment-business-days"

export class Utils {
    
    public static getMomentDate(str: string): moment.Moment {
        if (str) {
            return moment(str, 'DD-MM-YYYY')
        }
        
        return null
    }
}