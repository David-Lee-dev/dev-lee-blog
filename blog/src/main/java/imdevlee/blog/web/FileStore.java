package imdevlee.blog.web;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class FileStore {

    @Value("${file.dir}")
    public String fileDir;

    public String getFullPath(String filename) {
        return fileDir + filename;
    }

    public String getDirName(MultipartFile multipartFile) {
        String a = multipartFile.getOriginalFilename().split(".md")[0];
        return a;
    }

    public String[] storeFiles(List<MultipartFile> multipartFiles, String dirName) throws IOException {
        List<String> storeResult = new ArrayList<>();

        for (MultipartFile file : multipartFiles) {
            if (!file.isEmpty()) {
                storeFile(file, dirName);
                storeResult.add(file.getOriginalFilename());
            }
        }

        return storeResult.toArray(new String[storeResult.size()]);
    }

    public String storeFile(MultipartFile multipartFile, String dirName) throws IOException {
        if (multipartFile.isEmpty()) {
            return null;
        }

        File directory = new File(getFullPath(dirName + "/"));

        // 해당 디렉토리가 없을경우 디렉토리를 생성합니다.
        if (!directory.exists()) {
            try{
                directory.mkdir(); //폴더 생성합니다.
                log.info("{} 폴더 생성", dirName);
            }
            catch(Exception e){
                e.getStackTrace();
            }
        }

        String filename = multipartFile.getOriginalFilename();
        multipartFile.transferTo(new File(getFullPath(dirName + "/" + filename)));

        return filename;
    }
}
