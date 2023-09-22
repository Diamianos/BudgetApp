package com.johnsavard.budgetapp.utilities;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.johnsavard.budgetapp.entity.Tags;
import java.io.IOException;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class SubFolderTagsConverter
  implements AttributeConverter<Tags, String> {

  private ObjectMapper objectMapper;

  public SubFolderTagsConverter() {
    objectMapper = new ObjectMapper();
  }

  @Override
  public String convertToDatabaseColumn(Tags attribute) {
    if (attribute == null) {
      return null;
    }
    try {
      return objectMapper.writeValueAsString(attribute);
    } catch (JsonProcessingException jpe) {
      System.out.println("JSON processing error occured: " + jpe.toString());
      return null;
    }
  }

  @Override
  public Tags convertToEntityAttribute(String dbData) {
    if (dbData == null) {
      return null;
    }
    try {
      return objectMapper.readValue(dbData, Tags.class);
    } catch (IOException ioe) {
      System.out.println("IO exception occured: " + ioe.toString());
      return null;
    }
  }
}
