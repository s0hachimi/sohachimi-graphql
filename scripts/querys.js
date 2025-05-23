export const querys = {

    user: `
    {
        user {
            id
            login
            firstName
            lastName
            campus
            email
            createdAt
            auditRatio
            createdAt
            attrs 
        }
    }
`,

    level: `{
        transaction(
            where: {
                type: { _eq: "level" }
                event: { object: { name: { _eq: "Module" } } }
            }
            order_by: { amount: desc }
            limit: 1
        ){
            amount
        }
    }`,

    xp: `{
        transaction_aggregate(
            where: {
                type: { _eq: "xp" }
                event: { object: { name: { _eq: "Module" } } }
            }
        ) {
        aggregate {
            sum {
                amount
            }
        }
        }
    }`,

    skill: `{
         user {
            transactions(where: {type: {_like: "skill%"}}) {
                type
                amount
            }
        }
    }
    `,
    project: `{
        transaction(
            where: {type: {_eq: "xp"}, object: {type: {_eq: "project"}}, path: {_nlike: "%checkpoint%"}}
        ) {
            object {
                name
                progresses {
       	            group {
                        members {
                            userLogin
                        }
                    }
                }
            }
            amount
            createdAt    
            }
    }
    `,
    audit: `{
        user {
            failed: audits(where: {closureType: {_eq: failed}}) {
                closureType
            }
            succeeded: audits(where: {closureType: {_eq: succeeded}}) {
                closureType
            }
        }
    }`



}




