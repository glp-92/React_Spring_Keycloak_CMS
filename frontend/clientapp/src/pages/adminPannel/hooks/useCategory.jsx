import { useState, useEffect } from 'react'
import { GetCategoriesPageable, CreateCategory, DeleteCategory, UpdateCategory } from '../../../util/requests/Categories';

const categoriesPerPage = 4;

const useCategory = () => {

  const [categories, setCategories] = useState([]);
  const [inputCategory, setInputCategory] = useState('');
  const [categoryPage, setCategoryPage] = useState(0);
  const [nCategoryPages, setNCategoryPages] = useState(0);

  const handleCreateCategory = async () => {
    const token = localStorage.getItem("jwt");
    const newCategoryName = inputCategory.toLowerCase();
    try {
      const response = await CreateCategory(newCategoryName, token);
      if (response.ok) {
        setInputCategory('');
        fetchCategories(categoryPage);
      }
      else {
        throw new Error(`Erroneous answer from server`);
      }
    } catch (error) {
      console.error("Error. Category not created!", error);
    }
  }

  const handleUpdateCategory = async (index) => {
    const token = localStorage.getItem("jwt");
    const category = categories[index];
    try {
      let response = await UpdateCategory(category, token);
      if (!response.ok) {
        throw new Error(`Erroneous answer from server`);
      }
    } catch (error) {
      console.log("Error. Category not updated!", error);
    }
  }

  const handleEditCategoryLabel = (newName, index) => {
    const newCategories = [...categories];
    newCategories[index]["name"] = newName;
    newCategories[index]["slug"] = newName;
    setCategories(newCategories);
  }

  const handleDeleteCategory = async (id, index) => {
    if (confirm('Esta accion borrara la Categoria de la base de datos, continuar?')) {
      const token = localStorage.getItem("jwt");
      if (!token) return false;
      try {
        let response = await DeleteCategory(id, token);
        if (!response.ok) {
          throw new Error(`Erroneous answer from server`);
        }
        fetchCategories(categoryPage);
        // setCategories(prevCategories => prevCategories.filter(category => category.id !== id));
      } catch (error) {
        console.log("Error. Category not deleted!", error);
      }
    }
  }

  const fetchCategories = async (page) => {
    try {
      const response = await GetCategoriesPageable(page, categoriesPerPage);
      if (!response.ok) {
        throw new Error(`Error fetching categories`);
      }
      const fetchedCategories = await response.json();
      setCategories(fetchedCategories.content);
      setNCategoryPages(fetchedCategories.totalPages)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories(categoryPage);
  }, [categoryPage])

  return {
    categories,
    inputCategory,
    setInputCategory,
    categoryPage,
    setCategoryPage,
    nCategoryPages,
    handleCreateCategory,
    handleEditCategoryLabel,
    handleUpdateCategory,
    handleDeleteCategory
  };
}

export default useCategory;