package imdevlee.blog.web.controller;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class ArticleForm {

    private String title;
    private String type;
    private String tags;
    private String categoryName;
    private MultipartFile contentsFile;
    private List<MultipartFile> imageFiles;
}
