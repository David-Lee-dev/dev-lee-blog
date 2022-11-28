package imdevlee.blog.web.controller.dto;

import imdevlee.blog.domain.Article;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ResponseArticleDto {
    private Long id;
    private String type;
    private String title;
    private String[] tags;
    private String thumbnail;
    private String createdTime;

    public ResponseArticleDto(Article article, String thumbnail) {
        this.id = article.getId();
        this.type = article.getType();
        this.title = article.getTitle();
        this.tags = article.getTags().split(" ");
        this.thumbnail = thumbnail;
        this.createdTime = article.getCreatedTime();
    }
}
