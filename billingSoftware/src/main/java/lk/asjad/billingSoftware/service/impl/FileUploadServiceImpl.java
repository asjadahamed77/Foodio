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

    // ✅ Upload file to Cloudinary and return the secure URL
    @Override
    public String uploadFile(MultipartFile file) {
        try {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                    "folder", "ajji_store/items" // optional: folder to organize images
            ));
            return uploadResult.get("secure_url").toString();
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to upload image", e);
        }
    }

    // ✅ Delete file from Cloudinary using public_id extracted from URL
    @Override
    public boolean deleteFile(String imgUrl) {
        try {
            String publicId = extractPublicId(imgUrl);
            if (publicId == null) {
                System.err.println("Invalid image URL: " + imgUrl);
                return false;
            }

            Map result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            System.out.println("Cloudinary delete result: " + result);
            return "ok".equals(result.get("result"));
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // ✅ Extract public_id from secure URL
    private String extractPublicId(String imageUrl) {
        if (imageUrl == null || !imageUrl.contains("/upload/")) return null;

        try {
            // Split after "/upload/"
            String[] parts = imageUrl.split("/upload/");
            if (parts.length < 2) return null;

            String afterUpload = parts[1]; // e.g., v123456/ajji_store/items/abc123.jpg
            String[] tokens = afterUpload.split("/");

            StringBuilder publicIdBuilder = new StringBuilder();
            for (int i = 1; i < tokens.length; i++) {
                publicIdBuilder.append(tokens[i]);
                if (i < tokens.length - 1) publicIdBuilder.append("/");
            }

            // Remove file extension
            String publicIdWithExt = publicIdBuilder.toString();
            return publicIdWithExt.replaceFirst("\\.[^.]+$", "");
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
