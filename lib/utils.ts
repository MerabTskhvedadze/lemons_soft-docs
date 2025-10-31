import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export interface GeorgianDateOptions {
    date?: Date;
    addDays?: number;
    format?: string;
    includeYearSuffix?: boolean;
}

export interface GeorgianDateOptions {
    /** Base date (defaults to current date) */
    date?: Date;
    /** Number of days to add/subtract (e.g., 1 = tomorrow, -1 = yesterday) */
    addDays?: number;
    /** Output format (supports DD, MM, MMMM, YYYY) */
    format?: string;
    /** Whether to append "წლის" after the year */
    includeYearSuffix?: boolean;
}

export function getGeorgianDateString(options: GeorgianDateOptions = {}): string {
    const {
        date = new Date(),
        addDays = 0,
        format = "DD MMMM YYYY",
        includeYearSuffix = false,
    } = options;

    const months: string[] = [
        "იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი",
        "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"
    ];

    const d = new Date(date);
    d.setDate(d.getDate() + addDays);

    const day = d.getDate().toString().padStart(2, "0");
    const monthIndex = d.getMonth();
    const month = months[monthIndex];
    const numericMonth = (monthIndex + 1).toString().padStart(2, "0");
    const year = d.getFullYear().toString();

    let result = format
        .replace("DD", day)
        .replace("MMMM", month)
        .replace("MM", numericMonth)
        .replace("YYYY", year);

    if (includeYearSuffix) result += " წლის";

    return result.trim();
}
