package com.szymonchmalonboarding;

import android.annotation.SuppressLint
import android.content.pm.PackageManager
import android.location.Location
import android.location.LocationListener
import android.location.LocationManager
import androidx.core.content.ContextCompat.getSystemService
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

import com.facebook.react.modules.core.PermissionAwareActivity
import com.facebook.react.modules.core.PermissionListener

interface GetPermissionCallback {
    fun handle(granted: Boolean)
}

class LocationModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private var requestCode = 0;

    override fun getName() = "LocationModule";

    @SuppressLint("MissingPermission")
    @ReactMethod
    fun getLocation(promise: Promise) {
        val locationManager = getSystemService(this.reactApplicationContext.applicationContext, LocationManager::class.java) as LocationManager

        getPermission(object: GetPermissionCallback {
            override fun handle(granted: Boolean) {
                if (!granted) {
                    promise.reject("no_permission", "Location permission denied")
                    return
                }

                val locationListener = object :LocationListener {
                    override fun onLocationChanged(location: Location) {
                        val readableValueMap = Arguments.createMap()
                        readableValueMap.putDouble("lat", location.latitude)
                        readableValueMap.putDouble("lng", location.longitude)
                        promise.resolve(readableValueMap)

                        locationManager.removeUpdates(this)
                    }

                    override fun onLocationChanged(locations: List<Location?>) {
                        onLocationChanged(locations.last()!!)
                    }

                }


                locationManager.requestLocationUpdates(
                    LocationManager.GPS_PROVIDER,
                    0L,
                    0f,
                    locationListener as LocationListener
                )
            }
        })

    }

    private fun getPermission(callback: GetPermissionCallback) {
        val activity = reactApplicationContext.currentActivity as PermissionAwareActivity;

        if (activity.checkSelfPermission(android.Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED){
            callback.handle(true);
            return
        }

        activity.requestPermissions(
            arrayOf(android.Manifest.permission.ACCESS_COARSE_LOCATION),
            requestCode,
            object: PermissionListener {
                override fun onRequestPermissionsResult(
                    p0: Int,
                    p1: Array<out String>?,
                    p2: IntArray?
                ): Boolean {
                    if (p0 == PackageManager.PERMISSION_GRANTED) {
                        callback.handle(true)
                    } else {
                        callback.handle(false)
                    }

                    return true
                }
            }
        )

        requestCode++;
    }

}
