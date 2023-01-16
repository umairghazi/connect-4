// import { isEmpty } from "lodash"
// import { useCallback, useContext, useState } from "react"
// import { AnyVariables, OperationContext, OperationResult, UseQueryArgs, Context as GraphqlContext } from "urql"

// export type LazyQueryProps<TResponse, TVariable> = UseQueryArgs<TVariable, TResponse>

// export type LazyQueryResponse<TResponse, TVariable> = OperationResult<TVariable, TResponse>

// export type LazyQueryCallbackFunction<TVariable> = (variables?: TVariable, context?: Partial<OperationContext>) => void

// export type LazyQueryHookResponse<TResponse, TVariable> = [
//   LazyQueryResponse<TResponse, TVariable>,
//   LazyQueryCallbackFunction<TVariable>
// ]

// export const useLazyQuery = <TResponse, TVariable extends object>(
//   query: LazyQueryProps<TResponse, TVariable>
// ): LazyQueryHookResponse<TResponse, TVariable> => {

//   const { query: graphqlQuery } = useContext(GraphqlContext)

//   const [fetching, setFetching] = useState(false)
//   const [data, setData] = useState<OperationResult<TResponse, TVariable>>()

//   const queryCallback = useCallback<LazyQueryCallbackFunction<TVariable>>((variables, context) => {
//     if (isEmpty(query)) {
//       console.error('No query provided')
//       return;
//     }

//     setFetching((current) => {
//       if (current) return current
//       setFetching(true)

//       graphqlQuery<TResponse, TVariable>(query, variables, context)
//       .toPromise()
//       .then((response) => {
//         setData(response)
//       })
//       .finally(() => {
//         setFetching(false)
//       })
//     })
//   }, [graphqlQuery, query])

//   return [{...data, fetching}, queryCallback]
// }

export const x = 10;  