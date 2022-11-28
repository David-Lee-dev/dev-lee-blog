package imdevlee.blog.repository.mapper;

import imdevlee.blog.domain.Category;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface CategoryMapper {
    void save(Category category);
    void delete(Long id);

    Optional<Category> findById(Long id);
    Optional<Category> findByName(
            @Param("name") String name,
            @Param("type") String type
    );
    List<Category> findAll(String type);
}
