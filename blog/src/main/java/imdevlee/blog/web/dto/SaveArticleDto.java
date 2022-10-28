package imdevlee.blog.web.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
public class SaveArticleDto {

    @NotNull
    private String title;
    @NotNull
    private String type;
    @NotNull
    private String[] tags;
    @NotNull
    private String categoryName;
    @NotNull
    private String password;
}
