package imdevlee.blog.web.controller.dto;

import imdevlee.blog.domain.Article;
import imdevlee.blog.domain.Category;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ResponseArticleDto {
    private Long id;
    private String type;
    private String title;
    private String[] tags;
    private String createdTime;

    public ResponseArticleDto(Article article) {
        this.id = article.getId();
        this.type = article.getType();
        this.title = article.getTitle();
        this.tags = article.getTags().split(" ");
        this.createdTime = article.getCreatedTime();
    }
}
