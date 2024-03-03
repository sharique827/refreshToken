import { isEmpty } from "lodash";
import { FilterCategory } from "./typings/enverx";
import { paginate } from "./general";

export function fetchallPostsAggregation(filter: FilterCategory) {
    const { limit: $limit, skip: $skip } = paginate(filter)
    const $match = isEmpty(filter) ? {} : { category: filter.category }
    const $sort = { createdOn: -1 }
    return [
        { $match },
        { $sort },
        {
            $facet: {
                result: [{ $skip }, { $limit }], count: [{ $count: 'count' }]
            }
        }
    ]
}