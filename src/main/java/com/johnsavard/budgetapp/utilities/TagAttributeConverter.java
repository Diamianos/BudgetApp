package com.johnsavard.budgetapp.utilities;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.util.Map;
import javax.persistence.AttributeConverter;

public class TagAttributeConverter
  implements AttributeConverter<Map<String, Integer>, String> {

  private ObjectMapper objectMapper;

  public TagAttributeConverter() {
    objectMapper = new ObjectMapper();
  }

  @Override
  public String convertToDatabaseColumn(Map<String, Integer> attribute) {
    if (attribute == null) {
      return null;
    }
    try {
      return objectMapper.writeValueAsString(attribute);
    } catch (JsonProcessingException jpe) {
      return null;
    }
  }

  @Override
  @SuppressWarnings("unchecked")
  public Map<String, Integer> convertToEntityAttribute(String dbData) {
    if (dbData == null) {
      return null;
    }
    try {
      return objectMapper.readValue(dbData, Map.class);
    } catch (IOException ioe) {
      return null;
    }
  }
}
