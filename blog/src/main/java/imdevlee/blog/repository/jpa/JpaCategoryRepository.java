package imdevlee.blog.repository.jpa;

import com.querydsl.jpa.impl.JPAQueryFactory;
import imdevlee.blog.domain.Category;
import imdevlee.blog.repository.CategoryRepository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static imdevlee.blog.domain.QCategory.*;


public class JpaCategoryRepository implements CategoryRepository {

    private final EntityManager em;
    private final JPAQueryFactory query;

    public JpaCategoryRepository(EntityManager em) {
        this.em = em;
        this.query = new JPAQueryFactory(em);
    }


    @Override
    @Transactional
    public Category save(Category category) {
        em.persist(category);
        return category;
    }

    @Override
    @Transactional
    public void delete(Long id) {
        em.remove(findById(id));
    }

    @Override
    public Category findById(Long id) {
        return em.find(Category.class, id);
    }

    @Override
    public Category findByName(String name, String type) {
        return query.select(category)
                .from(category)
                .where(category.type.eq(type), category.name.like("%" + name + "%"))
                .fetchOne();
    }

    @Override
    public List<Category> findAll(String type) {
        return query.select(category)
                .from(category)
                .where(category.type.eq(type))
                .fetch();
    }
}
