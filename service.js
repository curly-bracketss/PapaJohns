import BASE_URL from './config.js';

const GetData = async () => {
    try {
        const response = await fetch(`${BASE_URL.GET}/category`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error(`Error message: ${error.message}`);
    }
};

const printData = async (category) => {
    try {
        const response = await fetch(`${BASE_URL.GET}/${category}`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error(`Error message: ${error.message}`);
    }
};

const deleteItemById = async (category, id) => {
    try {
        const response = await fetch(`${BASE_URL.DELETE}/${category}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json(); 
    } catch (error) {
        console.error(`Error message: ${error.message}`);
    }
};
const changeItemById = async (category, id, meal) => {
    try {
        const response = await fetch(`${BASE_URL.PUT}/${category}/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(meal)
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json(); 
    } catch (error) {
        console.error(`Error message: ${error.message}`);
    }
};
const createItem= async (category,meal) => {
    try {
        const res = await fetch(`${BASE_URL.POST}/${category}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(meal)
        })
        if (!res.ok) {
            throw new Error(`Post da xetta bas verdi, status: ${res.status}`)
        }
        return res
    } catch (error) {
        console.log(error.message);
    }
}


export {
    GetData,
    printData,
    deleteItemById,
    changeItemById,
    createItem
};
