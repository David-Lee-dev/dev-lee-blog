package imdevlee.blog.service;

import imdevlee.blog.domain.Category;
import imdevlee.blog.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> getCategoryList(String type) {
        return categoryRepository.findCategories();
    }
}
