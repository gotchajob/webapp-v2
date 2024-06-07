import { Certificate } from "crypto"
import { Point } from "mapbox-gl"

expert {
    experience,
    nation: string[],
    
    skillOptionList: [
        {
            skillOptionId
            skillOptionName,
            categoryId,
            categoryName,
            skillId,
            skillName
            point,
            rating,
            Certificate
        }
    ]
    totalRating
}