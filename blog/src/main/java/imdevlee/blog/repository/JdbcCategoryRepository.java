package imdevlee.blog.repository;

import imdevlee.blog.domain.Category;
import imdevlee.blog.repository.interfaces.CategoryRepository;
import imdevlee.blog.repository.mapper.CategoryMapper;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class JdbcCategoryRepository implements CategoryRepository {

    private final CategoryMapper categoryMapper;

    @Override
    public Category save(Category category) {
        categoryMapper.save(category);

        return category;
    }

    @Override
    public void delete(Long id) {
        categoryMapper.delete(id);
    }

    @Override
    public Category findById(Long id) {
        Optional<Category> category = categoryMapper.findById(id);
        return category.orElse(null);
    }

    @Override
    public Category findByName(String name, String type) {
        Optional<Category> category = categoryMapper.findByName(name, type);
        return category.orElse(null);
    }

    @Override
    public List<Category> findAll(String type) {
        return categoryMapper.findAll(type);
    }
}
