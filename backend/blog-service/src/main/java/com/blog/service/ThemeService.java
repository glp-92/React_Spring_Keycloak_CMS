package com.blog.service;

import java.util.List;

import com.blog.model.pojo.Theme;
import com.blog.model.dto.theme.ThemeCreate;
import com.blog.model.dto.theme.ThemeEdit;

public interface ThemeService {
	List<Theme> getAllThemes();
	Theme getThemeByName(String themeName);
	Theme createTheme(ThemeCreate request);
	Theme editTheme(ThemeEdit request);
	boolean deleteTheme(String themeId);
}
