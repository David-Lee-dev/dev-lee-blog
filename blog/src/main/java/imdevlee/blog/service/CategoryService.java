package imdevlee.blog.service;

import imdevlee.blog.domain.Category;
import imdevlee.blog.repository.interfaces.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Transactional
    public List<Category> getCategoryList(String type) {
        return categoryRepository.findAll(type);
    }

}
