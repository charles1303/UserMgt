package main;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
/**
 * This class is thread safe.
 */
public class Parser {

private static Parser instance;

private static File file;

    private Parser() {
        //lots of initialization code
    }

    public static synchronized Parser getInstance(File f) {
        if(instance == null) {
            instance = new Parser();
            if(file == null){
              instance.setFile(f);
            }
            
        }
        return instance;
    }


  
  public void setFile(File f) {
    file = f;
  }
  public File getFile() {
    return file;
  }
  public String getContent() throws IOException {
    FileInputStream i = new FileInputStream(file);
    String output = "";
    int data;
    while ((data = i.read()) > 0) {
      output += (char) data;
    }
    return output;
  }
  public String getContentWithoutUnicode() throws IOException {
    FileInputStream i = new FileInputStream(file);
    String output = "";
    int data;
    while ((data = i.read()) > 0) {
      if (data < 0x80) {
        output += (char) data;
      }
    }
    return output;
  }
  public void saveContent(String content) throws IOException {
    FileOutputStream o = new FileOutputStream(file);
    for (int i = 0; i < content.length(); i += 1) {
      o.write(content.charAt(i));
    }
  }
}

