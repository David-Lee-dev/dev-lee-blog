package imdevlee.blog.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class FileStore {

    @Value("${file.dir}")
    public String fileDir;

    public String getFullPath(String filename) {
        return fileDir + filename;
    }

    public String[] storeFiles(List<MultipartFile> multipartFiles) throws IOException {
        List<String> storeResult = new ArrayList<>();

        for (MultipartFile file : multipartFiles) {
            if (!file.isEmpty()) {
                storeFile(file);
                storeResult.add(file.getOriginalFilename());
            }
        }

        return storeResult.toArray(new String[storeResult.size()]);
    }

    public String storeFile(MultipartFile multipartFile) throws IOException {
        if (multipartFile.isEmpty()) {
            return null;
        }

        String filename = multipartFile.getOriginalFilename();
        multipartFile.transferTo(new File(getFullPath(filename)));
        return filename;
    }
}
