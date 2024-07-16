import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';
//import { resourceLimits } from 'worker_threads';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    //Note: toPromise() is a deprecated function that will be removed in the future.
    //It's possible to do the assignment using lastValueFrom, but we recommend using toPromise() for now as we haven't
    //yet talked about Observables. https://indepth.dev/posts/1287/rxjs-heads-up-topromise-is-being-deprecated
    var reqPromise = this.http.get(this.expressBaseUrl + endpoint).toPromise();
    console.log(this.expressBaseUrl + endpoint);
    return Promise.resolve(reqPromise);
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
      return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    //search/:category/:resource
    let encodedResource = encodeURIComponent(resource);
    let end = '/search' + '/' + category + '/' + encodedResource; 
    //window.alert(end);
    let promise = this.sendRequestToExpress(end).then((data) => {
      //based on category we will populate array of data
      if(category == 'artist')
      {
        return data.artists.items.map((artist=>{return new ArtistData(artist);}))
      }
      else if(category == 'album')
      {
        return data.albums.items.map((album=>{return new AlbumData(album);}))
       
      }
      else if(category == 'track')
      {
        return data.tracks.items.map((track=>{return new TrackData(track);}))
      }
      return;
    });
    return Promise.resolve(promise);
  }

  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    let encodedID = encodeURIComponent(artistId);
    let end = '/artist/' + encodedID;
    let promise = this.sendRequestToExpress(end).then((data) => {
      return new ArtistData(data);
    });
    
    return Promise.resolve(promise);
  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    //TODO: use the related artist endpoint to make a request to express and return an array of artist data.
    let encodedID = encodeURIComponent(artistId);
    let end = '/artist-related-artists/' + encodedID;
    
    let promise = this.sendRequestToExpress(end).then((data) => {
      let relatedArtists:ArtistData[];
      return relatedArtists = data.artists.map((artist)=>{
        return new ArtistData(artist);
      })
    });
    
    return Promise.resolve(promise);
  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    let encodedID = encodeURIComponent(artistId);
    let end = '/artist-top-tracks/' + encodedID;

    let promise = this.sendRequestToExpress(end).then((data) => {
      let topTracks:TrackData[];
      return topTracks = data.tracks.map((track)=>{
        return new TrackData(track);
      })
    });
    
    return Promise.resolve(promise);
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    let encodedID = encodeURIComponent(artistId);
    let end = '/artist-albums/' + encodedID;

    let promise = this.sendRequestToExpress(end).then((data) => {
      let albums:AlbumData[];
      //console.log(data);
      return albums = data.items.map((album)=>{
        return new AlbumData(album);
      })
    });
    
    return Promise.resolve(promise);
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    let encodedID = encodeURIComponent(albumId);
    let end = '/album/' + encodedID;
    let promise = this.sendRequestToExpress(end).then((data) => {
      return new AlbumData(data);
    });

    return Promise.resolve(promise);
  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    let encodedID = encodeURIComponent(albumId);
    let end = '/album-tracks/' + encodedID;
    let promise = this.sendRequestToExpress(end).then((data) => {
      let albumTracks:TrackData[];
      return albumTracks = data.items.map((track)=>{
        return new TrackData(track);
      })
    });
    return Promise.resolve(promise);
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    let encodedID = encodeURIComponent(trackId);
    let end = '/track/' + encodedID;
    let promise = this.sendRequestToExpress(end).then((data) => {
      return new TrackData(data);
    });

    return Promise.resolve(promise);
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    let encodedID = encodeURIComponent(trackId);
    let end = '/track-audio-features/' + encodedID;
    
    
    let promise = this.sendRequestToExpress(end).then((data) => {
      //Find percentage features
      let audioFeatures:TrackFeature[]=[];
      audioFeatures.push(new TrackFeature('danceability',data.danceability));
      audioFeatures.push(new TrackFeature('energy',data.energy));
      audioFeatures.push(new TrackFeature('speechiness',data.speechiness));
      audioFeatures.push(new TrackFeature("acousticness",data.acousticness));
      audioFeatures.push(new TrackFeature('instrumentalness',data.instrumentalness));
      audioFeatures.push(new TrackFeature('liveness',data.liveness));
      audioFeatures.push(new TrackFeature('valence',data.valence));
      return audioFeatures;
    });
    return Promise.resolve(promise);
  }


}
