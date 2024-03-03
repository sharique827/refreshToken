import { Filter } from "./typings/enverx";

/**
 * pagination
 * @exports
 * @param {Filter} filter
 * @returns {Filter}
 */
export function paginate(filter: Filter): { limit: number; skip: number; } {
    const limit = filter?.limit ?? 10
    const skip = filter?.skip ?? 0
    return { limit, skip }
}