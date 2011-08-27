package controllers;

import play.*;
import play.data.validation.*;
import play.mvc.*;
import play.vfs.*;
import play.libs.*;
import play.i18n.*;

import com.google.gson.*;

import java.util.*;
import java.util.zip.*;
import java.io.*;

public class Geonames extends Controller {

    private static JsonObject getGeonamesLocal(VirtualFile vf)
	    throws IOException {
	Reader in = new InputStreamReader(
	        new GZIPInputStream(vf.inputstream()), "UTF-8");
	JsonElement geonames = new JsonParser().parse(in);
	return geonames.getAsJsonObject();
    }

    private static JsonObject getGeonames(String ws) throws IOException {
	VirtualFile vf = VirtualFile.fromRelativePath("/cache/geonames-"
	        + ws.replace('?', '_') + "-" + Lang.get() + ".json.gz");
	if (!vf.exists()) {
	    WS.HttpResponse response = WS.url(
		    "http://ws.geonames.org/" + ws + "&style=short&lang="
		            + Lang.get()).get();
	    InputStream in = response.getStream();
	    OutputStream out = new GZIPOutputStream(vf.outputstream());
	    int count;
	    byte data[] = new byte[512];
	    while ((count = in.read(data, 0, 512)) > 0) {
		out.write(data, 0, count);
	    }
	    out.flush();
	    out.close();
	}
	return getGeonamesLocal(vf);
    }

    static JsonObject getCountries() throws IOException {
	return getGeonames("countryInfoJSON?maxRows=300");
    }

    public static void reset() {
	VirtualFile vf = VirtualFile.fromRelativePath("/cache/");
	File directory = vf.getRealFile();

	File[] toBeDeleted = directory.listFiles(new FileFilter() {
	    public boolean accept(File theFile) {
		if (theFile.isFile()) {
		    return theFile.getName().startsWith("geonames-");
		}
		return false;
	    }
	});
	for (File deletableFile : toBeDeleted) {
	    deletableFile.delete();
	}

    }

    // JSON
    public static void zones(@Required String countryId) throws IOException {
	if (!validation.hasErrors()) {
	    JsonObject zones = getGeonames("childrenJSON?geonameId="
		    + countryId);
	    renderJSON(zones.toString());
	} else {
	    error("countryId is required");
	}
    }

    // TODO: autocomplete cities:
    // http://ws.geonames.org/searchJSON?featureClass=P&country=US&style=short
    // but it requires countryCode instead of geonameId
}