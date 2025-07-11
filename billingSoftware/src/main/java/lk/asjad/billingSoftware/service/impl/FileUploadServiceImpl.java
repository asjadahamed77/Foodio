package lk.asjad.billingSoftware.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FileUploadServiceImpl implements FileUploadService {

    private final Cloudinary cloudinary;

    @Override
    public String uploadFile(MultipartFile file) {
        try {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            return uploadResult.get("secure_url").toString(); // return the uploaded file's URL
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file to Cloudinary", e);
        }
    }

    @Override
    public boolean deleteFIle(String imgUrl) {
        try {
            // Extract public_id from image URL
            String publicId = getPublicIdFromUrl(imgUrl);
            if (publicId == null) return false;

            Map<?, ?> result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            return "ok".equals(result.get("result"));
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete file from Cloudinary", e);
        }
    }

    // Helper method to extract the public_id from the Cloudinary image URL
    private String getPublicIdFromUrl(String imageUrl) {
        if (imageUrl == null || imageUrl.isEmpty()) return null;

        try {
            // example URL: https://res.cloudinary.com/demo/image/upload/v1623456789/folder_name/abc123.jpg
            String[] parts = imageUrl.split("/");
            String filenameWithExtension = parts[parts.length - 1]; // e.g. abc123.jpg
            return imageUrl.substring(imageUrl.indexOf("/upload/") + 8).replaceAll("\\.[^.]*$", ""); // remove extension
        } catch (Exception e) {
            return null;
        }
    }
}