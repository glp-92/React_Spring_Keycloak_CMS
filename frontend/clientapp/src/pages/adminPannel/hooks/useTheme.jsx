import { useState, useEffect } from 'react'
import { CreateTheme, DeleteTheme, GetThemesPageable, UpdateTheme } from '../../../util/requests/Themes';

const themesPerPage = 2;

const useTheme = () => {

  const [themes, setThemes] = useState([]);
  const [themePage, setThemePage] = useState(0);
  const [nThemePages, setNThemePages] = useState(0);

  const fetchThemes = async (page) => {
    try {
      const response = await GetThemesPageable(page, themesPerPage);
      if (!response.ok) {
        throw new Error(`Error fetching themes`);
      }
      const fetchedThemes = await response.json();
      setThemes(fetchedThemes.content);
      setNThemePages(fetchedThemes.totalPages);
    } catch (error) {
      console.log(error);
    }
  }

  const handleCreateTheme = async (e) => {
    e.preventDefault();
    const themeForm = new FormData(e.currentTarget);
    const slug = themeForm.get('name').toLowerCase().replace(/\s+/g, '-');
    let themeData = {};
    themeForm.forEach((value, key) => themeData[key] = value);
    themeData.slug = slug;
    const token = localStorage.getItem("jwt");
    try {
      const response = await CreateTheme(themeData, token);
      if (response.ok) {
        const createdTheme = await response.json()
        // setThemes(prevThemes => [...prevThemes, createdTheme]);
        document.getElementById("createThemeForm").reset();
        fetchThemes(themePage);
      }
      else {
        throw new Error(`Erroneous answer from server`);
      }
    } catch (error) {
      console.error("Error. Theme not created!", error);
    }
  }

  const handleUpdateTheme = async (e) => {
    e.preventDefault();
    const themeForm = new FormData(e.currentTarget);
    const slug = themeForm.get('name').toLowerCase().replace(/\s+/g, '-');
    let themeData = {};
    themeForm.forEach((value, key) => themeData[key] = value);
    themeData.slug = slug;
    const token = localStorage.getItem("jwt");
    try {
      let response = await UpdateTheme(themeData, token);
      if (!response.ok) {
        throw new Error(`Erroneous answer from server`);
      }
    } catch (error) {
      console.log("Error. Theme not updated!", error);
    }
  }

  const handleDeleteTheme = async (id, index) => {
    if (confirm('Esta accion borrara la Categoria de la base de datos, continuar?')) {
      const token = localStorage.getItem("jwt");
      if (!token) return false;
      try {
        let response = await DeleteTheme(id, token);
        if (!response.ok) {
          throw new Error(`Erroneous answer from server`);
        }
        // setThemes(prevThemes => prevThemes.filter(theme => theme.id !== id));
        fetchThemes(themePage);
      } catch (error) {
        console.log("Error. Theme not deleted!", error);
      }
    }
  }

  useEffect(() => {
    fetchThemes(themePage);
  }, [themePage])

  return {
    themes,
    setThemes,
    themePage,
    setThemePage,
    nThemePages,
    handleCreateTheme,
    handleUpdateTheme,
    handleDeleteTheme,
  };
}

export default useTheme;