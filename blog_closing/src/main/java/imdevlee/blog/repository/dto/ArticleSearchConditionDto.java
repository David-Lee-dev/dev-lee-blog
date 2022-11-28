package imdevlee.blog.repository.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArticleSearchConditionDto {
    private String queryString;
    private Long categoryId;
    private String type;

    public ArticleSearchConditionDto() {}

    public ArticleSearchConditionDto(String queryString, Long categoryId, String type) {
        this.queryString = queryString;
        this.categoryId = categoryId;
        this.type = type;
    }
}
