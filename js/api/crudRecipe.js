function authHeaders(token) {
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}
function getToken() {
  const token = sessionStorage.getItem("token");
  return token;
}

export const postRecipe = async (recipe, url) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: authHeaders(getToken()),
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting recipe:", error);
    throw error;
  }
};

export const getRecipes = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: authHeaders(getToken()),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

export const getRecipeById = async (id, url) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "GET",
      headers: authHeaders(getToken()),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipe by ID:", error);
    throw error;
  }
};

export const deleteRecipeById = async (id, url) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: authHeaders(getToken()),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return true; // Return true on successful deletion
  } catch (error) {
    console.error("Error deleting recipe by ID:", error);
    throw error;
  }
};
export const updateRecipeById = async (id, recipe, url) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: authHeaders(getToken()),
      body: JSON.stringify(recipe),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating recipe by ID:", error);
    throw error;
  }
};

export const url = "http://localhost:3000/recipes";
