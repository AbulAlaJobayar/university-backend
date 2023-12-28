/* eslint-disable @typescript-eslint/no-explicit-any */
export const meta = (perPageLimit:any, totalDataLength:any, result: any):any => {
    const totalPage = Math.ceil(totalDataLength / perPageLimit)
    for (let page = 1; page <= totalPage; page++) {
        const currentLimit = Math.min(perPageLimit, totalDataLength - (page - 1) * perPageLimit);
        const startIndex = (page - 1) * perPageLimit;
        const pageData = result.slice(startIndex, startIndex + currentLimit);
        perPageLimit += 10
        return { page, currentLimit,pageData,perPageLimit}

    }


}