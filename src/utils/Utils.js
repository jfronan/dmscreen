export const capitalizeWord = (stringBase)=> {
    try {
        return stringBase.charAt(0).toUpperCase() + stringBase.slice(1);
    } catch (error) {
        if (typeof stringBase === 'string') {
            console.log(error);
        }
        return null;
    }
}